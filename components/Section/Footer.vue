<script lang="ts" setup>
import { SvgLogoWhite } from '#components';
import { Blottie } from 'blottie'
</script>


<template>
    <div id="contact" >
        <div>

            <Blottie 
            class=" w-[100vw] absolute h-[calc(100svh-7rem)] object-cover"
            :lottie="{
                player: 'svg',
                renderer: 'svg',
                path: '/lottie/data_footer.json',
            }"
        />

<div class="flex justify-center items-end mb-8 h-[calc(100svh-7rem)] text-center text-black text-[15px] font-normal  ">
    <div class="flex flex-col gap-0 leading-[1.3]">
    <span class="font-mono mono-text block">Design & AD: Aletheia, Leith Benkhedda</span>
    <span class="font-mono mono-text block">Photography: Thadde Comar</span>
    <span class="font-mono mono-text block">Web development: Sascha Krischock</span>
    </div>
</div>
</div>


    <div class="w-full bg-black flex flex-row justify-between px-6 py-4 relative">
<div class="  text-white text-[15px] font-normal font-mono mono-text">©2025 | A Thesis Build – All Rights Reserved</div>

<SvgLogoWhite class="absolute left-1/2 -translate-x-1/2 w-24 h-10"/>

<div class="   justify-end items-center gap-8 inline-flex">
<a href="#build" class="text-center text-white font-mono font-normal  mono-text">Build</a>
<a href="#editorials" class="text-center text-white font-mono font-normal mono-text">Editorials</a>
<a href="#contact" class="text-center text-white font-mono font-normal mono-text" >Contact</a>
</div>
</div>

</div>
</template>