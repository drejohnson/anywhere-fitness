async function faunaUserAuth(user, context, callback) {
  const { Client, query: q } = require("faunadb@2.11.1"); // from Auth0 registry. See https://auth0.com/docs/rules

  const client = new Client({
    secret: configuration.SERVER_SECRET,
  });

  try {
    let user_from_fauna = await client.query(
      q.Let(
        {
          "userExists": q.Exists(
            q.Match(q.Index("user_by_email"), user.email)
          ),
        },
        q.If(
          q.Not(Var("userExists")),
          q.Create(q.Collection("User"),{data:{email:user.email}}),
          q.Get(q.Match(q.Index("user_by_email"), user.email))
        )
      )
    );

    /* create a secret from the user's ref in the Tokens collection */
    const credential = await client.query(
      q.Create(q.Tokens(), { instance: user_from_fauna.ref })
    );
    
    user.user_metadata = {
      secret: credential.secret,
      user_id: credential.instance.id,
      role: user_from_fauna.ref.collection.id.toLowerCase(),
    };

    /* The custom claim allows us to attach the user_metadata to the returned object */
    const namespace = "https://fauna.com/"; // fauna because we are using FaunaDB
    context.idToken[namespace + "user_metadata"] = user.user_metadata;

    await auth0.users
      .updateUserMetadata(user.user_id, user.user_metadata);

    callback(null, user, context);
  } catch (error) {
    callback(error, user, context);
  }
}