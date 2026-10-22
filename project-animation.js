const animations = new WeakMap();

function openProject(details, animate = true) {
    const content = details.querySelector('.project-content');

    animations.get(details)?.cancel();
    details.open = true;

    history.replaceState(null, '', '#' + details.id);

    if (!animate) return;

    const paddingBottom = getComputedStyle(content).paddingBottom;
    const height = content.offsetHeight;

    const animation = content.animate(
        [
            { height: '0px', paddingBottom: '0px', opacity: 0 },
            { height: height + 'px', paddingBottom: paddingBottom, opacity: 1 }
        ],
        { duration: 400, easing: 'ease' }
    );
    animations.set(details, animation);
    animation.onfinish = () => animations.delete(details);
}

function closeProject(details) {
    const content = details.querySelector('.project-content');

    animations.get(details)?.cancel();

    if (location.hash === '#' + details.id) {
        history.replaceState(null, '', location.pathname + location.search);
    }

    const paddingBottom = getComputedStyle(content).paddingBottom;
    const height = content.offsetHeight;

    const animation = content.animate(
        [
            { height: height + 'px', paddingBottom: paddingBottom, opacity: 1 },
            { height: '0px', paddingBottom: '0px', opacity: 0 }
        ],
        { duration: 300, easing: 'ease' }
    );
    animations.set(details, animation);
    animation.onfinish = () => {
        details.open = false;
        animations.delete(details);
    };
}

document.querySelectorAll('.project').forEach(details => {
    const summary = details.querySelector('summary');

    summary.addEventListener('click', e => {
        e.preventDefault();
        if (details.open) {
            closeProject(details);
        } else {
            openProject(details);
        }
    });
});

function openProjectFromHash(animate) {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;

    const target = document.getElementById(id);
    if (!target || target.tagName !== 'DETAILS') return;

    if (!target.open) openProject(target, animate);
    target.scrollIntoView({ behavior: animate ? 'smooth' : 'auto', block: 'start' });
}

openProjectFromHash(false);

window.addEventListener('hashchange', () => openProjectFromHash(true));