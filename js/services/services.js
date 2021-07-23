const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getData = async data => {
    let res = await fetch(data);
    if (!res.ok) {
        throw new Error('ERROR');
    } 
    return await res.json();
};


export {postData};
export {getData};