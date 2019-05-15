
export const kitsService = {
    fetchKits
}

function fetchKits() {
    return new Promise(resolve => resolve({
        headers: ["#", "First", "Last", "Handle"],
        body: [[1, "Mark", "Otto", "@mdo"],
            [2, "Jacob", "Thornton", "@fat"],
            [3, "Larry", "the Bird", "@twitter"]]
    }))
}