// Piston API Helper - Free code execution API
// Documentation: https://github.com/engineer-man/piston

const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

// Language mapping from JDoodle to Piston
const languageMap = {
    'python3': 'python',
    'cpp': 'c++',
    'java': 'java',
    'nodejs': 'javascript'
};

/**
 * Execute code using Piston API
 * @param {string} language - Language identifier (python3, cpp, java, nodejs)
 * @param {string} code - Source code to execute
 * @param {string} input - Standard input for the program
 * @returns {Promise<{output: string, cpuTime: number, memory: number, error?: string}>}
 */
export async function executeCode(language, code, input = '') {
    try {
        const pistonLanguage = languageMap[language] || language;

        const response = await fetch(`${PISTON_API_URL}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: pistonLanguage,
                version: '*', // Use latest version
                files: [
                    {
                        name: getFileName(pistonLanguage),
                        content: code
                    }
                ],
                stdin: input,
                args: [],
                compile_timeout: 10000,
                run_timeout: 3000,
                compile_memory_limit: -1,
                run_memory_limit: -1
            })
        });

        if (!response.ok) {
            throw new Error(`Piston API error: ${response.statusText}`);
        }

        const result = await response.json();

        // Format response to match previous API structure
        return {
            output: result.run.stdout || result.run.stderr || '',
            cpuTime: result.run.code === 0 ? 0.1 : 0, // Piston doesn't provide exact CPU time
            memory: 0, // Piston doesn't provide memory usage in response
            error: result.run.stderr || (result.run.code !== 0 ? result.run.output : null)
        };
    } catch (error) {
        console.error('Piston API execution error:', error);
        throw error;
    }
}

/**
 * Get runtimes available in Piston
 * @returns {Promise<Array>}
 */
export async function getRuntimes() {
    try {
        const response = await fetch(`${PISTON_API_URL}/runtimes`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Piston runtimes:', error);
        throw error;
    }
}

function getFileName(language) {
    const fileNames = {
        'python': 'main.py',
        'c++': 'main.cpp',
        'java': 'Main.java',
        'javascript': 'main.js'
    };
    return fileNames[language] || 'main.txt';
}
