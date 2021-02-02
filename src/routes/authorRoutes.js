const express = require('express');
const authorsRouter = express.Router();
const Authordata=require('../model/Authordata');
function router(nav){
    /*var authors=[
        {
            name:'Joseph Barbera',
            period:'1911-2006',
            genre:'genre-cartoon',
            desc:'Joseph Roland Barbera (/bɑːrˈbɛərə, ˈbɑːrbərə/ bar-BAIR-ə, BAR-bər-ə, Italian: [barˈbɛːra]; March 24, 1911 – December 18, 2006) was an American animator, director, producer, storyboard artist, and cartoon artist, whose film and television cartoon characters entertained millions of fans worldwide for much of the 20th century.He was born to Italian immigrants in New York City, where he lived, attended college and began his career through his young adult years. After working odd jobs and as a banker, Barbera joined Van Beuren Studios in 1932 and subsequently Terrytoons in 1936. In 1930, he moved to California and while working at Metro-Goldwyn-Mayer (MGM), Barbera met William Hanna. The two men began a collaboration that was at first best known for producing Tom and Jerry. In 1957, after MGM dissolved their animation department, they co-founded Hanna-Barbera, which became the most successful television animation studio in the business, producing programs such as The Flintstones, Yogi Bear, Scooby-Doo, Top Cat, The Smurfs, Huckleberry Hound, and The Jetsons. In 1967, Hanna-Barbera was sold to Taft Broadcasting for $12 million, but Hanna and Barbera remained heads of the company. In 1991, the studio was sold to Turner Broadcasting System, which in turn was merged with Time Warner, owners of Warner Bros., in 1996; Hanna and Barbera stayed on as advisors.',
            img:'barbera.jpg'
        },
        {
            name:'J K Rowling',
            period:'1997-present',
            genre:'genre-fantasy',
            desc:'Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL (/ˈroʊlɪŋ/ ROH-ling; born 31 July 1965), better known by her pen name J. K. Rowling, is a British author and philanthropist. She is best known for writing the Harry Potter fantasy series, which has won multiple awards and sold more than 500 million copies,becoming the best-selling book series in history.The books are the basis of a popular film series, over which Rowling had overall approval on the scripts and was a producer on the final films.She also writes crime fiction under the pen name Robert Galbraith.',
            img:'rowling.jfif'
        },
        {
            name:'Vaikom Muhammed Basheer',
            period:'1908-1994',
            genre:'genre-drama',
            desc:'Vaikom Muhammad Basheer (21 January 1908 – 5 July 1994), also known as Beypore Sultan, was an Indian independence activist and writer of Malayalam literature . He was a writer, humanist, freedom fighter, novelist and short story writer, noted for his path-breaking, down-to-earth style of writing that made him equally popular among literary critics as well as the common man. His notable works include Balyakalasakhi, Shabdangal, Pathummayude Aadu, Mathilukal, Ntuppuppakkoranendarnnu, Janmadinam and Anargha Nimisham and the translations of his works into other languages have earned him worldwide acclaim. The Government of India awarded him the fourth highest civilian honor of the Padma Shri in 1982. He was also a recipient of the Sahitya Academy Fellowship, Kerala Sahitya Academy Fellowship, and the Kerala State Film Award for Best Story.',
            img:'vmbasheer.jfif'
        }]*/
    authorsRouter.get('/',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("authors",
            {
                nav,
                title:'Library',
                authors
            });
        });
    });
    authorsRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render("author",
            {
                nav,
                title:'Library',
                author
            });
        });
    });

    return authorsRouter;
}

module.exports=router;