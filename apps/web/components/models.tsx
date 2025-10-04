import { Tilt } from '@workspace/ui/components/tilt';

export function Models() {
    return (
        <Tilt rotationFactor={8} isRevese>
            <div
                style={{
                    borderRadius: '3px',
                }}
                className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
            >
                <img
                    src='https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg'
                    alt='Ghost in the shell - Kôkaku kidôtai'
                    className='h-48 w-full object-cover'
                />
                <div className='p-2'>
                    <h1 className='leading-snug text-zinc-950 dark:text-zinc-50'>
                        flux-pro/v1.1-ultra
                    </h1>
                    <p className='mt-2 text-xs text-zinc-700 dark:text-zinc-400'>FLUX1.1 [pro] ultra is the newest version of FLUX1.1 [pro], maintaining professional-grade image quality while delivering up to 2K resolution with improved photo realism.</p>
                </div>
            </div>
        </Tilt>
    );
}
