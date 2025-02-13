<script lang="ts" setup>
import { SvgLogoWhite } from '#components';
import { Blottie } from 'blottie'
</script>


<template>
     <div id="contact" class="w-full overflow-hidden relative">
        <div class="relative">
            <Blottie 
                class="w-[100vw] absolute top-0 left-0 origin-center
                       max-lg:scale-[2]
                       pointer-events-none h-[calc(100svh-7rem)] object-cover"
                :lottie="{
                    player: 'svg',
                    renderer: 'svg',
                    path: '/lottie/data_footer.json',
                }"
            />

<div class="flex max-lg:items-center max-lg:gap-4 max-lg:flex-col justify-end lg:justify-center items-end lg:mb-6 mb-4 h-[calc(100svh-7rem)] text-center text-black text-[15px] font-normal  ">
    <div class="flex w-full flex-col gap-0 leading-[1.3]">
    <span class="font-mono mono-text block">Design & AD: Aletheia, Leith Benkhedda</span>
    <span class="font-mono mono-text block">Photography: Thadde Comar</span>
    <span class="font-mono mono-text block">Web development: Sascha Krischock</span>
    </div>

    <div class="flex lg:hidden gap-4">
    <a href="#build" class="text-center bg-[#F4F4F4] py-1 px-3 rounded-xl font-mono font-normal  mono-text">Build</a>
<a href="#editorials" class="text-center  bg-[#F4F4F4] py-1 px-3 rounded-xl font-mono font-normal mono-text">Editorials</a>
<a href="#contact" class="text-center bg-[#F4F4F4] py-1 px-3 rounded-xl font-mono font-normal mono-text" >Contact</a>
</div>

    <div class="flex lg:hidden  font-mono flex-col gap-0 leading-[1.3]">
    ©2025 | A Thesis Build<br class="!block">
    All Rights Reserved
</div>
</div>
</div>


    <div class="w-full bg-black flex flex-row justify-between px-6 max-lg:justify-center  py-4 relative">
<div class=" max-lg:hidden  text-white text-[15px] font-normal font-mono mono-text">©2025 | A Thesis Build – All Rights Reserved</div>

<SvgLogoWhite class="lg:absolute lg:left-1/2 lg:-translate-x-1/2 w-24 lg:h-10"/>

<div class=" max-lg:hidden  justify-end items-center gap-8 inline-flex">
<a href="#build" class="text-center text-white font-mono font-normal  mono-text">Build</a>
<a href="#editorials" class="text-center text-white font-mono font-normal mono-text">Editorials</a>
<a href="#contact" class="text-center text-white font-mono font-normal mono-text" >Contact</a>
</div>
</div>

</div>
</template>