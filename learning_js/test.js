let n=parseInt(prompt());
let i=1;
let arr=[];

while(i<=n){
    arr.push(prompt().split(" ").map((k) => parseInt(k)));
    i++;
}

let sum=0;
for (let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
        sum=sum+arr[i][j]
    }
};
sum=sum/(n**2);
for (let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
        if (sum<=arr[i][j]) console.log(arr[i][j])
    }
}