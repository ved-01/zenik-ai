import React from 'react'
import { HeroSection } from '@/components/ui/hero-section-dark'

export function Hero() {
    return (
        <HeroSection
            title="AI-Powered Business Solutions"
            subtitle={{
                regular: "Transform your business with ",
                gradient: "intelligent AI solutions",
            }}
            description="Empower your organization with cutting-edge artificial intelligence. From automation to insights, we help businesses unlock the full potential of AI technology."
            ctaText="Get Started with AI"
            ctaHref="#contact"
            bottomImage={{
                light: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80",
                dark: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
            }}
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