import Express from 'express';
/**
 * This shortcut function responses with HTTP 405 to the requests having
 * a method that does not have corresponding request handler.
 *
 * For example if a resource allows only GET and POST requests then
 * PUT, DELETE, etc. requests will be responded with the 405.
 *
 * HTTP 405 is required to have Allow-header set to a list of allowed
 * methods so in this case the response has "Allow: GET, POST, HEAD" in its headers.
 *
 * Example usage
 * ```
 *    // A handler that allows only GET (and HEAD) requests and returns
 *    app.all('/path', (req, res, next) => {
 *      restful(req, res, {
 *        get: () => {
 *          res.send('Hello world!');
 *        },
 *        post: async () => {
 *          await doSomethingAsync();
 *          res.send(`I did something async and don't need to catch errors to put them into #next`);
 *        }
 *      });
 *    });
 * ```
 * Original author: https://stackoverflow.com/a/15754373/9346616
 */
export default function restfulRequestHandler(req: Express.Request, res: Express.Response, next: Express.NextFunction, handlers: {
    [key: string]: () => void | Promise<void>;
}): void;
//# sourceMappingURL=RestfulRequestHandler.d.ts.map