'use client'
import React from 'react'
import { Mail, SendHorizontal, ArrowRight, Brain, Cpu, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function Hero() {
    return (
        <>
            <main className="overflow-hidden">
                <section>
                    <div className="relative mx-auto max-w-6xl px-6 pt-32 lg:pb-16 lg:pt-48">
                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                            >
                                <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
                                    <span className="w-2 h-2 bg-accent-violet rounded-full mr-2 animate-pulse" />
                                    Leading AI Consulting Firm
                                </div>

                                <h1 className="text-balance text-4xl font-medium sm:text-5xl md:text-6xl">
                                    <span className="text-gradient-hero">Empowering Businesses</span>
                                    <br />
                                    <span className="text-foreground">with AI-Driven Innovation</span>
                                </h1>

                                <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
                                    Zenik AI helps organizations unlock the power of Artificial Intelligence through tailored solutions, strategic consulting, and cutting-edge implementation.
                                </p>

                                <form
                                    action=""
                                    className="mt-12 mx-auto max-w-sm">
                                    <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] pr-1.5 items-center rounded-[1rem] border shadow shadow-zinc-950/5 has-[input:focus]:ring-2 lg:pr-0">
                                        <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4" />

                                        <input
                                            placeholder="Your business email"
                                            className="h-12 w-full bg-transparent pl-12 focus:outline-none"
                                            type="email"
                                        />

                                        <div className="md:pr-1.5 lg:pr-0">
                                            <Button
                                                aria-label="Get Started"
                                                size="sm"
                                                className="rounded-[0.5rem]">
                                                <span className="hidden md:block">Get Started</span>
                                                <SendHorizontal
                                                    className="relative mx-auto size-5 md:hidden"
                                                    strokeWidth={2}
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </form>

                                <div
                                    aria-hidden
                                    className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left"
                                >
                                    <div className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                                        <div className="relative h-96 overflow-hidden rounded-[1.5rem] border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--border),var(--border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
                                    </div>
                                    <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                                        <div className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                                            <AIInsightsComponent />

                                            <div className="bg-muted rounded-[1rem] p-4 pb-16 dark:bg-white/5"></div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5" />
                                </div>
                            </AnimatedGroup>
                        </div>
                    </div>
                </section>
                <LogoCloud />
            </main>
        </>
    )
}

const AIInsightsComponent = () => {
    return (
        <div className="relative space-y-3 rounded-[1rem] bg-white/5 p-4">
            <div className="flex items-center gap-1.5 text-accent-violet">
                <Brain className="size-5" />
                <div className="text-sm font-medium">AI Performance</div>
            </div>
            <div className="space-y-3">
                <div className="text-foreground border-b border-white/10 pb-3 text-sm font-medium">Your AI models are performing 87% better than industry average.</div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="space-x-1">
                            <span className="text-foreground align-baseline text-xl font-medium">94.2%</span>
                            <span className="text-muted-foreground text-xs">Model Accuracy</span>
                        </div>
                        <div className="flex h-5 items-center rounded bg-gradient-to-l from-accent-violet to-accent-teal px-2 text-xs text-white">Q4 2024</div>
                    </div>
                    <div className="space-y-1">
                        <div className="space-x-1">
                            <span className="text-foreground align-baseline text-xl font-medium">78.9%</span>
                            <span className="text-muted-foreground text-xs">Previous Quarter</span>
                        </div>
                        <div className="text-foreground bg-muted flex h-5 w-3/4 items-center rounded px-2 text-xs dark:bg-white/20">Q3 2024</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LogoCloud = () => {
    return (
        <section className="bg-background pb-16 md:pb-32">
            <div className="group relative m-auto max-w-6xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="inline md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm text-muted-foreground">Trusted by leading organizations</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold text-muted-foreground dark:text-white/60">TechCorp</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold text-muted-foreground dark:text-white/60">DataFlow</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold text-muted-foreground dark:text-white/60">InnovateLab</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold text-muted-foreground dark:text-white/60">FutureAI</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold text-muted-foreground dark:text-white/60">SmartSystems</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold text-muted-foreground dark:text-white/60">CloudTech</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold text-muted-foreground dark:text-white/60">NeuralNet</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-semibold text-muted-foreground dark:text-white/60">AICore</div>
                            </div>
                        </InfiniteSlider>

                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}