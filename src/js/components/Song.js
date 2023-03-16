class Song {
  constructor(element) {
    const thisSong = this;
    thisSong.createData(element);
  }
  createData(element) {
    const thisSong = this;

    let authorName = element.filename.replaceAll('_', ' ');

    authorName = authorName.toUpperCase();
    authorName = authorName.replace(element.title.toUpperCase(), '');
    authorName = authorName.replace('-', '');
    authorName = authorName.trim();
    authorName = authorName.replace('.MP3', '');
    authorName = authorName.toLowerCase();
    authorName = authorName.split(' ');

    for (let i = 0; i < authorName.length; i++) {
      authorName[i] =
        authorName[i].charAt(0).toUpperCase() + authorName[i].slice(1);
    }
    
    thisSong.specifyData = {
      id: element.id,
      title: element.title,
      author: authorName.join(' '),
      filename: element.filename,
      categories: element.categories.join(', '),
      ranking: element.ranking,
      fullName: element.title + ' ' + authorName.join(' '),
    };

    return thisSong.specifyData;
  }
}

export default Song;
