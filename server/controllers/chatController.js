exports.postChatResponse = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Chat posted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error posting comment",
      error,
    });
  }
};
