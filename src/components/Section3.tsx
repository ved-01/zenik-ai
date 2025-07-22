import React from 'react'
import { HeroSection } from '@/components/ui/hero-section-dark'

export function Section3() {
    return (
        <HeroSection
            title="3rd Section"
            subtitle={{
                regular: "Transform your business with ",
                gradient: "intelligent AI solutions",
            }}
            description="Empower your organization with cutting-edge artificial intelligence. From automation to insights, we help businesses unlock the full potential of AI technology."
            ctaText="Get Started with AI"
            ctaHref="#contact"
            gridOptions={{
                angle: 65,
                opacity: 0.4,
                cellSize: 50,
                lightLineColor: "#4a4a4a",
                darkLineColor: "#2a2a2a",
            }}
        />
    )
}