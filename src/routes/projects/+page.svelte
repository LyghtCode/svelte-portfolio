<svelte:head>
	<title>Tristan Simpson - Projects</title>
</svelte:head>

<script>
    import { onMount, onDestroy } from "svelte";
    import { fade } from 'svelte/transition';
    import { setScene } from '$lib/wavySphere.js';

    // Create a new wavy sphere scene
    let SiteMounted = false;
    let wavySphere;

    // Github Repo Data
    let repos = [];

    // AutoScroll Interval
    let interval = null;
    onDestroy(async () => clearInterval(interval));

    // On Page Mount
    onMount(async () => {
        // Initialize the scene and the page contents
        SiteMounted = true;
        await setScene(wavySphere);

        // Get 'realTristan' Github Data
        await self.fetch("https://api.github.com/users/LyghtCode/repos")
            .then(response => response.json())
            .then(json => repos = [...repos, ...json])
            .catch(error => console.log(error));
        
        
        // Get 'Simpson Computer Technologies Research' Github Data
        await self.fetch("https://api.github.com/users/GolfDAO/repos")
            .then(response => response.json())
            .then(json => repos = [...repos, ...json])
            .catch(error => console.log(error));
            

        // Scroll wheel action event listener. Don't use if on mobile!
        if (!navigator.userAgentData.mobile) {
            // Auto Scroll intervals and variables
            let autoScroll = false;
            interval = window.setInterval(async () => autoScroll?window.scrollBy(0, 5) :0, 15)
            setTimeout(async () => autoScroll = true, 4000);

            // Scroll timeouts
            let timeout = null;
            document.addEventListener('wheel', (_) => {
                if (autoScroll) autoScroll = false;

                // After two seconds of not scrolling, auto scroll again
                clearTimeout(timeout);
                timeout = setTimeout(async () => autoScroll = true, 5000);
            });
        }
    });
</script>

<div> {#if SiteMounted}
    <!-- Main Header Content -->
    <div class="ml-40 xl:ml-48 2xl:ml-64 mt-16 lg:mt-36 xl:mt-44 mb-10 lg:fixed">
        <div class="group">
            <!-- /realTristan Header -->
            <a class="font-black text-[1.2rem] xl:text-2xl 2xl:text-4xl text-white group-hover:text-gray-300 tracking-widest mt-8 ml-2 ease-linear duration-100"
                href="https://github.com/LyghtCode?tab=repositories" rel="noopener noreferrer" target="_blank"
                in:fade={{ delay: 500, duration: 1000 }}>
                <mark style="background: none;" class="text-[#38ffff]">/</mark>&nbsp;lyghtCode
            </a>
            <div class="bg-[#38ffff] h-1 mt-2 rounded-full w-0 group-hover:w-8 duration-700 ease-in-out"></div>
        </div>

        <!-- Projects Header -->
        <div><h2 class="font-black text-5xl xl:text-7xl 2xl:text-9xl text-white tracking-widest mt-2 2xl:mt-6" in:fade={{ delay: 1500, duration: 2000 }}>
            Projects
        </h2></div>
    </div>

    <!-- Top left "TS" Header -->
    <div class="group top-6 left-6 fixed hidden lg:block">
        <a class="font-black text-4xl text-white tracking-widest" href="/">TS</a>
        <div class="bg-[#38ffff] h-1 mt-2 rounded-full w-0 group-hover:w-full duration-1000 ease-in-out"></div>
    </div>

    <!-- Sidebar Items -->
    <div class="top-28 left-[0.9rem] fixed hidden lg:block" in:fade={{ delay: 2500, duration: 2000 }}>
        <div class="group mb-28 -rotate-90">
            <a class="text-sm text-white tracking-widest" href="/">HOME</a>
            <div class="bg-[#38ffff] h-1 mt-2 rounded-full w-0 group-hover:w-12 duration-700 ease-in-out"></div>
        </div>

        <div class="group mb-10 -rotate-90">
            <a class="text-sm text-white tracking-widest" href="/#projects">PROJECTS</a>
            <div class="bg-[#38ffff] h-1 mt-2 rounded-full w-0 group-hover:w-12 duration-700 ease-in-out"></div>
        </div>

        <div class="group mt-[7.7rem] -rotate-90">
            <a class="text-sm text-white tracking-widest" href="/#about">ABOUT ME</a>
            <div class="bg-[#38ffff] h-1 mt-2 rounded-full w-0 group-hover:w-12 duration-700 ease-in-out"></div>
        </div>
    </div>

    <!-- Github Repositories -->
    <div class="lg:flex justify-center lg:justify-end" style="z-index: -1;"><div>
        {#each repos as data, i}
            <div class="group my-20 translate-y-0 hover:-translate-y-8 duration-[400ms] ease-in-out lg:mr-10 mx-28 lg:mx-0 w-[20rem] md:w-[40rem] 2xl:w-[50rem]" in:fade={{ delay: 2200+(250*i), duration: 1000 }}>
                <a href={data.html_url} rel="noopener noreferrer" target="_blank" class="mb-48 h-64 px-10 pt-6 rounded-[2.5rem] tracking-widest shadow-[#202020]">
                    <h2 class="text-white text-center text-xl font-black">
                        <mark style="background: none;" class="text-[#38ffff]">#</mark>&nbsp;{data.name}
                    </h2>
                    <h2 class="text-gray-200 text-center text-md font-base mt-4">{data.description}</h2>
                    <div class="flex justify-center items-center mt-6">
                        {#each data.topics as topic}
                            <div class="">
                                <h2 class="text-[0.60rem] text-gray-50 tracking-widest mx-4 uppercase">{topic}</h2>
                            </div>
                        {/each}
                    </div>
                </a>
            </div>
        {/each}
    </div></div>
{/if}</div>

<!-- The 3D Wave Sphere -->
<canvas bind:this={wavySphere} style="top: 0px; right: 0px; z-index: -1; position: fixed;"/>
