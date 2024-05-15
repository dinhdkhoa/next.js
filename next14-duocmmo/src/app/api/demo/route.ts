
interface divInfo {
    top: number
    left: number
    width: number
    height: number
    visible: boolean
    name: string
}

const divData: divInfo[] = [
    {
        top: 250,
        left: 15,
        width: 180,
        height: 50,
        visible: false,
        name: "tree"
    },
    {
        top: 725,
        left: 370,
        width: 115,
        height: 60,
        visible: false,
        name: "mouse"
    },
    {
        top: 555,
        left: 200,
        width: 115,
        height: 90,
        visible: false,
        name: "mug"
    },
    {
        top: 675,
        left: 30,
        width: 70,
        height: 100,
        visible: true,
        name: "headphone"
    }
]
export async function GET() {
    return Response.json(divData, {
        status: 200,
    })
}