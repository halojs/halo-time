export default function () {
    return function* _time(next, start = Date.now()) {
        yield* next
        this.set('X-Response-Time', `${Math.ceil(Date.now() - start)}ms`)
    }
}