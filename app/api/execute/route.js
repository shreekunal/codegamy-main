import { executeCode } from '@/utils/pistonAPI';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { language, code, input } = await req.json();

        if (!language || !code) {
            return NextResponse.json(
                { error: 'Language and code are required' },
                { status: 400 }
            );
        }

        const result = await executeCode(language, code, input || '');

        return NextResponse.json(result);
    } catch (error) {
        console.error('Code execution error:', error);
        return NextResponse.json(
            { error: 'Code execution failed', details: error.message },
            { status: 500 }
        );
    }
}
