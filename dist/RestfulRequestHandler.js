"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleRestfully;
/**
 * This little wrapper function allows handling HTTP requests in a RESTful manner.
 * Fastify might respond to a HEAD request correctly, but doesn't correctly respond
 * with an HTTP 405 (Method Not Allowed) if a request method is not supported.
 *
 * For example, if you define `get` and `post` handlers,
 * HEAD, GET and POST are allowed and responded to accordingly,
 * while PUT, DELETE, PATCH, etc. will be responded with HTTP 405
 * with an "Allow" header containing the allowed methods.
 *
 * For incoming HEAD requests, it tries to call the specified GET handler to generate a response.
 * If you want to implement custom logic for HEAD requests, you can add a `head` handler.
 *
 * Example usage
 * ```
 * // A handler that allows only GET (and HEAD) requests
 * fastify.all('/hello', (request, reply): Promise<FastifyReply> => {
 *   return handleRestfully(request, reply, {
 *     get: (): FastifyReply => {
 *       return reply
 *         .send(`Hello ${request.query.name ?? 'World'}!`);
 *     },
 *   });
 * });
 * ```
 *
 * @deprecated I think you are supposed to use Fastify a bit differently... I have to find a better way and will then remove this.
 */
async function handleRestfully(request, reply, handlers) {
    const method = request.method.toLowerCase();
    if (method in handlers) {
        await handlers[method]();
        return reply;
    }
    if (method == 'head' && 'get' in handlers) {
        await handlers['get']();
        return reply;
    }
    const allowedMethods = Object.keys(handlers);
    if (!allowedMethods.includes('head')) {
        allowedMethods.push('head');
    }
    return reply
        .status(405)
        .header('Allow', allowedMethods.join(', ').toUpperCase())
        .send('Method Not Allowed');
}
//# sourceMappingURL=RestfulRequestHandler.js.map