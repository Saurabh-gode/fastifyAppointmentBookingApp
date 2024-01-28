function sendResponse(
  reply,
  replyStatus,
  replyStatusCode,
  replyMessage = "",
  replyData = {},
  replyErr = {}
) {
  return reply.code(replyStatusCode).send({
    success: replyStatus,
    statusCode: replyStatusCode,
    message: replyMessage,
    data: replyData,
    error: replyErr,
  });
}

export default sendResponse;
