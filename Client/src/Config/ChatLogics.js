export const getSender=(loggedUser, users)=>{
    return users[0]._id== loggedUser._id ? users[1].name: users[0].name
}

export const getStatus=(loggedUser, users)=>{
  return users[0]._id== loggedUser._id ? users[1].status: users[0].status
}

export const getPic=(loggedUser, users)=>{
  if (users[0]._id== loggedUser._id){
    return users[1].pic
  }else{
    return  users[0].pic
  } 
}

export const getSenderFull= (loggedUser, users)=>{
    return users[0]._id== loggedUser._id ? users[1]: users[0]
}

export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };