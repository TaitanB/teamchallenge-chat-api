const getQueryParameters = (options = {}, owner) => {
  const { topic, query, type } = options;
  const queryParameters = {};

  if (owner) {
    queryParameters.owner = owner;
  }

  if (type) {
    queryParameters.type = type;
  }

  if (topic) {
    queryParameters.topic = topic;
  }

  const andConditions = [];

  if (query) {
    andConditions.push({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
  }

  if (andConditions.length > 0) {
    queryParameters.$and = andConditions;
  }

  return queryParameters;
};

module.exports = getQueryParameters;
