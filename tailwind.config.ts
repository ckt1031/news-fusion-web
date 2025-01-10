import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
    plugins: [typography],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'Noto Sans TC', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Inter', 'Noto Sans TC', 'monospace'],
            }
        }
    }
}
