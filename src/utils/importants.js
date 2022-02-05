
export function getCustomMembersList(members){
    if(members==null){
        return null;
    }

    let queue = [members.id];
    let visited = [];
    let list = [members];
    visited.push(members.id);
    let current;

    while(queue.length>0){
        current = queue.shift();
        //
        let nw = list.shift();
        nw["name"] = nw.firstName+" "+nw.lastName;
        nw["attributes"] = {"Gender": nw.gender, "Country": nw.country};

        for(let i=0;i<nw.children.length;i++){
            const isEqual = (num) => num===nw.children[i].id;
            if(visited.findIndex(isEqual)==-1){
                visited.push(nw.children[i].id);
                queue.push(nw.children[i].id);
                list.push(nw.children[i]);
            }
        }
    }

    return members;
}

export function getAllCountryList(){
    let countries = [
        {value: 'Afganistan', name: 'Afganistan'},
        {value: 'Albania', name: 'Albania'},
        {value: 'Algeria', name: 'Algeria'},
        {value: 'American Samoa', name: 'American Samoa'},
        {value: 'Andorra', name: 'Andorra'},
        {value: 'Angola', name: 'Angola'},
        {value: 'Anguilla', name: 'Anguilla'},
        {value: 'Antigua & Barbuda', name: 'Antigua & Barbuda'},
        {value: 'Argentina', name: 'Argentina'},
        {value: 'Armenia', name: 'Armenia'},
        {value: 'Aruba', name: 'Aruba'},
        {value: 'Australia', name: 'Australia'},
        {value: 'Austria', name: 'Austria'},
        {value: 'Azerbaijan', name: 'Azerbaijan'},
        {value: 'Bahamas', name: 'Bahamas'},
        {value: 'Bahrain', name: 'Bahrain'},
        {value: 'Bangladesh', name: 'Bangladesh'},
        {value: 'Barbados', name: 'Barbados'},
        {value: 'Belarus', name: 'Belarus'},
        {value: 'Belgium', name: 'Belgium'},
        {value: 'Belize', name: 'Belize'},
        {value: 'Benin', name: 'Benin'},
        {value: 'Bermuda', name: 'Bermuda'}
    ];

    return countries;
}

export function validateEmail(email){
    let reg = /\S+@\S+\.\S+/;
    return reg.test(email);
};