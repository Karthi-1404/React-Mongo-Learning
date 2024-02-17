const User = require('../../model/user')
const resolver = {
// Query:{
    users: async (pageSize,skip)=>{
        const users = await User.find().skip(skip).limit(pageSize);
        console.log('====',users);
        return users

    // }
}
}
module.exports = resolver