<script setup lang="ts">
const props = defineProps<{
	title: string;
	summary: string;
	link: string;
}>();
const toast = useToast();

const copyTitle = () => {
	navigator.clipboard.writeText(props.title);
	toast.add({ title: "Title copied to clipboard" });
};
const copySummary = () => {
	navigator.clipboard.writeText(props.summary);
	toast.add({ title: "Summary copied to clipboard" });
};
const copyLink = () => {
	navigator.clipboard.writeText(props.link);
	toast.add({ title: "Link copied to clipboard" });
};
const copyWhole = () => {
	navigator.clipboard.writeText(
		`${props.title}\n\n${props.summary}\n\n${props.link}`,
	);
	toast.add({ title: "Whole copied to clipboard" });
};
</script>

<template>
    <UPopover arrow>
        <UButton label="Copy Clipboard" color="neutral" variant="ghost" class="cursor-pointer" icon="i-hugeicons-copy-01"/>
        <template #content>
            <div class="flex flex-col gap-1 p-2">
            <UButton 
                label="Title"
                color="neutral"
                variant="ghost"
                class="cursor-pointer"
                @click="copyTitle"
            />
            <UButton 
                label="Summary"
                color="neutral"
                variant="ghost"
                class="cursor-pointer"
                @click="copySummary"
            />
            <UButton 
                label="Link"
                color="neutral"
                variant="ghost"
                class="cursor-pointer"
                @click="copyLink"
            />
            <UButton 
                label="Whole Text"
                color="neutral"
                variant="ghost"
                class="cursor-pointer"
                @click="copyWhole"
            />
            </div>
        </template>
    </UPopover>
</template>

<style scoped>

</style>