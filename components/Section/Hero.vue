<template>
    <section class="hero h-screen is-primary is-fullheight relative overflow-hidden">
        <Blottie 
            class="absolute inset-0 w-full h-full object-cover"
            :lottie="{
                player: 'svg',
                renderer: 'svg',
                path: '/lottie/data_hero.json',
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            }"
        />
        
        <div class="hero-body relative z-10">
            <div class="lg:p-7 p-4 pt-16 lg:pt-24 max-w-[90rem] flex flex-col justify-between h-[calc(100svh-0rem)] lg:h-[calc(100svh-5rem)]">
                <h1 class="text-black font-headline text-mobile-2xl lg:text-2xl font-bold">
                    <span>Trusting </span>
                    <span class="text-[#96FF5E]">centralized platforms </span><br class="max-lg:hidden">
                    <span class="text-black">with secrets management<br class="max-lg:hidden"> is giving Bezos your house keys.</span>
                </h1>
                <h2 class="subtitle font-headline mt-6 text-black font-medium text-mobile-xl lg:text-xl">
                    TACo is the only general-purpose access control plugin that works without<br class="max-lg:hidden"> trusting
                    an intermediary so users aren't obliged to trust AWS your dev team or<br class="max-lg:hidden">TACo.
                </h2>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { Blottie } from 'blottie'
</script>