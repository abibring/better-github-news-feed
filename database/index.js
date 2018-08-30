const mongoose = require('mongoose');
mongoose.connect('mongodb://alon:alon11@ds237932.mlab.com:37932/fullstack-review', { useMongoClient: true }); // connect to mlab for deployment

let repoSchema = mongoose.Schema({
  repoid: { 
    type: Number, unique: true 
  },
  user:  String,
  stargazers: Number,
  size: Number,
  description: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let saved = (repos) => {
  repos.body = JSON.parse(repos.body);
  repos.body.map(repo => {
    console.log(repo.id)
    Repo.insertMany([{
      repoid: repo.id,
      user: repo.owner.login, 
      name: repo.name, 
      stargazers: repo.stargazers_count, 
      size: repo.size,
      description: repo.description,
      url: repo. html_url  
    }], (err) => {
      if (err) {
        console.error(`error in saved: ${err}`)
      }
    });
  }) 
}

// Joes Way 
// let joeSave = (repos) => {
//   return Promise.all(repos.map(repo => {
//     return Repo.findOneAndUpdate(
//       { url: repo.url },
//       {
//         url: repo.html_url,
//         user: repo.owner.login,
//         stars: repo.stargazers_count,
//         name: repo.name
//       },
//       {upsert: true} //upsert is keyword in mongoose which means update or inert
//     ).exec()
//   }))
// }


let getInfo = (cb) => {
  Repo.find()
  .sort({ stargazers: -1})
  .limit(25)
  .exec(((err, docs) => {
    if (err) {
      console.error(`err in findById: ${err}`)
      cb(err, null);
    } else {
      cb(null, docs);
    }
  }))


}


module.exports = { saved, getInfo };