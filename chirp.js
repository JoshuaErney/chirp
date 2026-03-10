const ICONS = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"/></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"/></svg>',
    loading: '<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>',
};

const el = (tag, cls, html) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html) node.innerHTML = html;
    return node;
};

const chirp = {
    options: {
        maxToasts: 5,
        toastLife: 5000,
        currentToasts: 0,
    },

    getRack(location) {
        let toaster = document.getElementById('chirpToaster');
        if (!toaster) {
            toaster = el('div', `toaster ${location || 'top-right'}`);
            toaster.id = 'chirpToaster';
            const rack = el('ol', 'rack');
            rack.id = 'chirpRack';
            toaster.appendChild(rack);
            document.body.appendChild(toaster);
        } else {
            toaster.className = `toaster ${location || 'top-right'}`;
        }
        return document.getElementById('chirpRack');
    },

    toast({ title, message, type, location, icon, theme, customIcon, dismissable,
        onClick, onRender, onTimeout, customHTML, primaryButton, secondaryButton }) {

        const rack = this.getRack(location);

        if (this.options.currentToasts >= this.options.maxToasts) {
            rack.removeChild(rack.firstChild);
            this.options.currentToasts--;
        }

        const toaster = document.getElementById('chirpToaster');
        const isTop = ['top-right', 'top-center', 'top-left'].some(c => toaster.className.includes(c));

        const toast = el('li', [
            'chirptoast toast-enter',
            isTop ? 'toastDown' : 'toastUp',
            type,
            theme,
        ].filter(Boolean).join(' '));

        toast.id = `chirpToast-${++this.options.currentToasts}`;
        rack.appendChild(toast);

        // Icon
        if (icon) {
            toast.appendChild(el('div', 'icon', customIcon || ICONS[type] || ''));
        }

        // Content
        const notif = el('div', 'notif');
        const desc = el('div', 'desc');
        if (title) desc.appendChild(el('div', 'title', title));
        if (customHTML) desc.appendChild(el('div', 'message', customHTML));
        if (message) desc.appendChild(el('div', 'message', message));
        notif.appendChild(desc);

        // Buttons
        if (primaryButton || secondaryButton) {
            const btnWrap = el('div', 'toast-buttons');
            for (const [btn, cls] of [[primaryButton, 'primary'], [secondaryButton, 'secondary']]) {
                if (!btn) continue;
                const b = el('button', `toast-button ${cls}`, btn.text);
                b.onclick = e => { e.stopPropagation(); btn.onClick(e); };
                btnWrap.appendChild(b);
            }
            notif.appendChild(btnWrap);
        }

        toast.appendChild(notif);

        // Events
        if (typeof onClick === 'function') {
            toast.addEventListener('click', e => { e.stopPropagation(); onClick(e); });
        }
        if (dismissable) {
            toast.classList.add('dismissable');
            toast.addEventListener('click', () => this.despawnToast(toast.id));
        }
        if (typeof onRender === 'function') onRender(toast);

        // Timers
        setTimeout(() => toast.classList.remove('toast-enter'), 300);
        setTimeout(() => {
            if (typeof onTimeout === 'function') onTimeout(toast);
            this.despawnToast(toast.id);
        }, this.options.toastLife);
    },

    despawnToast(toastId, onClosed) {
        const toast = document.getElementById(toastId);
        if (!toast) return;
        toast.classList.add('toast-exit');
        setTimeout(() => {
            try {
                toast.parentNode.removeChild(toast);
                this.options.currentToasts--;
                if (typeof onClosed === 'function') onClosed(toast);
                if (this.options.currentToasts === 0) {
                    const toaster = document.getElementById('chirpToaster');
                    toaster?.parentNode.removeChild(toaster);
                }
            } catch { }
        }, 300);
    },

    promise({ promise, loadingMessage, successMessage, errorMessage, location, theme }) {
        const toastId = `chirpToast-${this.options.currentToasts + 1}`;
        this.toast({
            message: loadingMessage || 'Loading...',
            location, theme,
            icon: true,
            customIcon: ICONS.loading,
            dismissable: false,
        });

        return promise.then(
            result => { this.updatePromiseToast(toastId, { type: 'success', message: successMessage || 'Operation successful', icon: true }); return result; },
            error => { this.updatePromiseToast(toastId, { type: 'error', message: errorMessage || 'An error occurred', icon: true }); throw error; }
        );
    },

    updatePromiseToast(toastId, { type, message, icon }) {
        const toast = document.getElementById(toastId);
        if (!toast) return;
        toast.className = toast.className.replace(/\b(success|error|warning|info)\b/g, '').trim();
        toast.classList.add(type);
        const msgEl = toast.querySelector('.message');
        const iconEl = toast.querySelector('.icon');
        if (msgEl) msgEl.textContent = message;
        if (iconEl && icon) iconEl.innerHTML = ICONS[type] || '';
        clearTimeout(toast.timeoutId);
        toast.timeoutId = setTimeout(() => this.despawnToast(toastId), this.options.toastLife);
    },
};