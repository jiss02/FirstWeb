const shuffle = (arr) => {
    return arr.sort(()=> Math.random() - Math.random());
}

const Mixer = {
    mix: (memberArray) => {
        try{
            const nameArray = shuffle(memberArray.map(data => data.name))
            const mixedArray = memberArray.map( (data, idx) => {
                const person = {
                    name: nameArray[idx],
                    groupIdx: data.groupIdx,
                }
                return person;
            });
            return mixedArray
         } catch (err) {
             console.log(`mixer err: ${err}`)
         }
    }   
}

module.exports = Mixer;