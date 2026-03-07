<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key') ?? env('GEMINI_API_KEY');
    }

    public function generateGrading(string $taskTitle, string $taskDesc, string $answer)
    {
        if (!$this->apiKey) {
            return [
                'success' => false,
                'message' => 'API Key Gemini belum dikonfigurasi di .env (GEMINI_API_KEY)',
            ];
        }

        $prompt = "
            Anda adalah asisten guru profesional. Tugas Anda adalah memberikan penilaian pada jawaban siswa berdasarkan instruksi tugas yang diberikan.
            
            INSTRUKSI TUGAS:
            Judul: $taskTitle
            Deskripsi: $taskDesc
            
            JAWABAN SISWA:
            $answer
            
            Berikan nilai antara 0-100 dan berikan feedback konstruktif yang singkat dalam Bahasa Indonesia.
            Kembalikan hasil dalam format JSON murni seperti ini:
            {
                \"score\": 85,
                \"feedback\": \"Penjelasan Anda sangat baik, namun perlu ditambahkan detail pada bagian akhir.\"
            }
        ";

        Log::info('Gemini AI Grading - Start Prompt Generation', [
            'task_title' => $taskTitle,
            'answer_length' => strlen($answer)
        ]);
        Log::debug('Gemini AI Prompt', ['prompt' => $prompt]);

        try {
            $response = Http::post("{$this->apiUrl}?key={$this->apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'response_mime_type' => 'application/json',
                ]
            ]);

            Log::info('Gemini AI Response Received', ['status' => $response->status()]);

            if ($response->successful()) {
                $result = $response->json();
                $textResponse = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;

                Log::debug('Gemini AI Raw Content', ['content' => $textResponse]);

                if ($textResponse) {
                    $decoded = json_decode($textResponse, true);
                    return [
                        'success' => true,
                        'score' => $decoded['score'] ?? 0,
                        'feedback' => $decoded['feedback'] ?? 'Tidak ada feedback.',
                    ];
                }
            }

            Log::error('Gemini API Error Response', [
                'body' => $response->body(),
                'headers' => $response->headers()
            ]);
            return [
                'success' => false,
                'message' => 'Gagal mendapatkan respon dari AI.',
            ];
        } catch (\Exception $e) {
            Log::error('Gemini Service Exception: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Terjadi kesalahan sistem saat menghubungi AI.',
            ];
        }
    }
}
