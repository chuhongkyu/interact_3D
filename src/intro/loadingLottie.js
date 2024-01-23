import "@lottiefiles/lottie-player";


let loading = true;

export function loadingLottie() {
    let loadingDiv = document.querySelector('#three-js')
    const t1 = setTimeout(() => {
        loadingDiv.classList.add('hide');
        loading = false;
    }, 2000);

    setTimeout(() => {
        clearTimeout(t1);
    }, 3100);
}

export function isLoading() {
    return loading;
}