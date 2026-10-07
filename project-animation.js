document.querySelectorAll('.project').forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.project-content');
    let animation = null;

    summary.addEventListener('click', e => {
        e.preventDefault();

        if (animation) animation.cancel();

        const paddingBottom = getComputedStyle(content).paddingBottom;

        if (!details.open) {

            details.open = true;
            const height = content.offsetHeight;
            animation = content.animate(
                [
                    { height: '0px', paddingBottom: '0px', opacity: 0 },
                    { height: height + 'px', paddingBottom: paddingBottom, opacity: 1 }
                ],
                { duration: 400, easing: 'ease' }
            );
            animation.onfinish = () => { animation = null; };
        } else {

            const height = content.offsetHeight;
            animation = content.animate(
                [
                    { height: height + 'px', paddingBottom: paddingBottom, opacity: 1 },
                    { height: '0px', paddingBottom: '0px', opacity: 0 }
                ],
                { duration: 300, easing: 'ease' }
            );
            animation.onfinish = () => {
                details.open = false;
                animation = null;
            };
        }
    });
});
