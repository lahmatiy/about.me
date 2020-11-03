discovery.page.define('default', {
    view: 'struct',
    expanded: 2,
    limit: 12
});

discovery.view.define('video', (el, config, data) => {
    const { video } = typeof data === 'string' ? { video: data } : data;

    if (typeof video === 'string') {
        const videoEl = document.createElement('iframe');

        videoEl.setAttribute('width', 280);
        videoEl.setAttribute('height', 158);
        videoEl.setAttribute('src', video.replace(/^https?:\/\/youtu.be\/([^\/]+)\/?$/, 'https://www.youtube.com/embed/$1'));
        videoEl.setAttribute('frameborder', 0);
        videoEl.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        videoEl.setAttribute('allowfullscreen', '');

        el.appendChild(videoEl);
    }
});
