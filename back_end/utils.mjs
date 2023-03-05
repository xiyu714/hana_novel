export function success(ctx, data) {
    ctx.body = {
        data,
        status_code: 200
    }
}

export function err(ctx, message) {
    ctx.body = {
        message,
        status_code: -1
    }
}
