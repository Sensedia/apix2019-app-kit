
export const kitsService = {
    submitKit
}

function submitKit(kit) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(kit);
        }, 3000);
    })
}