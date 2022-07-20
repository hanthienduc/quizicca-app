
export function shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5)
}

export async function fetchData(url: string) {
    const response = await fetch(url)
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`
        throw new Error(message)
    }
    const questionsData = await response.json()
    return questionsData
}