function testData() {
    // Lets add a user
    const newuser = new User({email: 'a@a.com', created: new Date()});
    console.log('Save user')
    newuser.save().then((doc) => {
        console.log('User Saved')
        console.log(doc);
    }).catch((error) => {
        console.error(error);
    });
}
