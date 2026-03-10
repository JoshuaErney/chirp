// Types
const showSuccess = () => chirp.toast({
    title: 'Success',
    message: 'Your changes have been saved.',
    type: 'success',
    icon: true,
    dismissable: true,
});

const showError = () => chirp.toast({
    title: 'Error',
    message: 'Something went wrong.',
    type: 'error',
    icon: true,
    dismissable: true,
});

const showWarning = () => chirp.toast({
    title: 'Warning',
    message: 'This action may have side effects.',
    type: 'warning',
    icon: true,
    dismissable: true,
});

const showInfo = () => chirp.toast({
    title: 'Info',
    message: 'Here is some useful information.',
    type: 'info',
    icon: true,
    dismissable: true,
});

const showDefault = () => chirp.toast({
    title: 'Default',
    message: 'A plain toast with no type set.',
    dismissable: true,
});

// Themes
const showGlass = () => chirp.toast({
    title: 'Glass',
    message: 'Frosted glass effect.',
    type: 'info',
    theme: 'glass',
    icon: true,
    dismissable: true,
});

const showBrutalist = () => chirp.toast({
    title: 'Brutalist',
    message: 'Bold, no-nonsense style.',
    type: 'error',
    theme: 'brutalist',
    icon: true,
    dismissable: true,
});

const showGlassSuccess = () => chirp.toast({
    title: 'Glass + Success',
    message: 'Glass theme with type combined.',
    type: 'success',
    theme: 'glass',
    icon: true,
    dismissable: true,
});

const showBrutalistWarning = () => chirp.toast({
    title: 'Brutalist + Warning',
    message: 'Brutalist theme with type combined.',
    type: 'warning',
    theme: 'brutalist',
    icon: true,
    dismissable: true,
});

// Positions
const showPosition = (location) => chirp.toast({
    message: location,
    location,
    dismissable: true,
});

// Buttons
const showConfirmDelete = () => chirp.toast({
    title: 'Delete item?',
    message: 'This action cannot be undone.',
    type: 'error',
    icon: true,
    primaryButton: {
        text: 'Delete',
        onClick: () => chirp.toast({ message: 'Item deleted.', type: 'success', icon: true, dismissable: true }),
    },
    secondaryButton: {
        text: 'Cancel',
        onClick: () => chirp.toast({ message: 'Cancelled.', dismissable: true }),
    },
});

const showUpdatePrompt = () => chirp.toast({
    title: 'New update available',
    message: 'Version 2.0 is ready to install.',
    type: 'info',
    icon: true,
    primaryButton: {
        text: 'Install now',
        onClick: () => chirp.toast({ message: 'Installing...', type: 'info', icon: true, dismissable: true }),
    },
    secondaryButton: {
        text: 'Later',
        onClick: () => { },
    },
});

// Promise
const showPromiseResolve = () => chirp.promise({
    promise: new Promise(res => setTimeout(res, 2000)),
    loadingMessage: 'Saving your data...',
    successMessage: 'Saved successfully!',
    errorMessage: 'Failed to save.',
    location: 'top-right',
});

const showPromiseReject = () => chirp.promise({
    promise: new Promise((_, rej) => setTimeout(rej, 2000)),
    loadingMessage: 'Connecting...',
    successMessage: 'Connected!',
    errorMessage: 'Connection failed.',
    location: 'top-right',
});

// Custom
const showCustomIcon = () => chirp.toast({
    message: 'Copied to clipboard.',
    icon: true,
    customIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"/><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/></svg>',
    dismissable: true,
});

const showCustomHTML = () => chirp.toast({
    customHTML: '<strong>Bold</strong> and <em>italic</em> and <a href="#" style="color:inherit">a link</a>.',
    dismissable: true,
});

const showOnClick = () => chirp.toast({
    title: 'onClick fired',
    message: 'Check the console.',
    type: 'info',
    icon: true,
    onClick: (e) => console.log('Toast clicked', e),
});

// Progress bar
const showProgress = () => chirp.toast({
    title: 'Progress bar',
    message: 'Watch the countdown at the bottom.',
    type: 'info',
    icon: true,
    dismissable: true,
    progress: true,
});

// Dedupe
const showDedupe = () => chirp.toast({
    title: 'Validation error',
    message: 'Please fill in all required fields.',
    type: 'error',
    icon: true,
    dismissable: true,
    dedupe: true,
});

// Global callbacks
const enableGlobalCallbacks = () => {
    chirp.options.onToast = (toast) => console.log('Toast created:', toast.id);
    chirp.options.onDespawn = (toast) => console.log('Toast removed:', toast.id);
    chirp.toast({ message: 'Global callbacks enabled — check the console.', type: 'info', icon: true, dismissable: true });
};

// Clear all
const clearAll = () => chirp.clearAll();