export function copyToClipboard (
    text: string,
    onSuccess?: () => void,
    onError?: () => void
) {
    try {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        onSuccess?.()
    } catch (e) {
        onError?.()
    }
}