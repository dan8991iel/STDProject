export function generateCitation(style, book) {
  switch (style) {
    case 'apa':
      return apaStyle(book);
    case 'mla':
      return mlaStyle(book);
    case 'chicago':
      return chicagoStyle(book);
    default:
      return '';
  }


  function apaStyle(book){
    let apaCitation = "";

    if(book.authors){
        book.authors.forEach((author, index) =>{
          if(author.name){
            
            apaCitation += `${author.name.surname}, `;
            apaCitation += author.name.firstName.replace(/\b([A-Z])[a-z]+/g, '$1.').replace(/\s+/g, ' ');

              if(index != book.authors.length-1){
                apaCitation += index == book.authors.length-2 ? ' &' : ',';
              }
              apaCitation += ' '
          }
        })
      }else{
        apaCitation += `${book.title}.`;
      }

      apaCitation += `(${book.releaseYear ? book.releaseYear : 'o. J.'}). `;
      apaCitation += `${book.title}${book.subheading ? ': ' + book.subheading : ''}`;
      apaCitation += `${book.edition? ' ('+book.edition+' ed.). ':'. '}`;
      apaCitation += `${book.publisher}.`;
      //apaCitation += `${book.url ? ' '+ book.url + '.': ''}`;

      return apaCitation;
  }


  function mlaStyle(book){
    let mlaCitation = "";

    if(book.authors){
        switch (book.authors.length){
          case 1: 
            if(!book.authors[0] || !book.authors[0].name){break;}
            mlaCitation += `${book.authors[0].name.surname}, ${book.authors[0].name.firstName}. `;
            break;
          case 2:
            if(!book.authors[0] || !book.authors[0].name || !book.authors[1].name){break;}
            mlaCitation += `${book.authors[0].name.surname}, ${book.authors[0].name.firstName}, and ${book.authors[1].name.firstName} ${book.authors[1].name.surname}. `;
            break;
          default: 
            if(!book.authors[0] || !book.authors[0].name){break;}
            mlaCitation += `${book.authors[0].name.surname}, ${book.authors[0].name.firstName}, et al. `;
            break;
        }
      }

      mlaCitation += `${book.title}${book.subheading ? ': ' + book.subheading : ''}. `;
      mlaCitation += `${book.edition? book.edition+' ed., ':''}`;
      mlaCitation += `${book.publisher}, `;
      mlaCitation += `${book.releaseYear ? book.releaseYear : 'o. J.'}.`;


      return mlaCitation;
  }


  function chicagoStyle(book){
    let chicagoCitation = "";

    if(book.authors){
      book.authors.every((author, index) =>{
        if(author.name){
        
          if(index == 7 && book.authors.length > 10){
            chicagoCitation += "et al. ";
            return false;
          }

          if(index == 0){
            chicagoCitation += `${author.name.surname}, ${author.name.firstName}`;
          }else{
            chicagoCitation += `${author.name.firstName} ${author.name.surname}`;
          }


          if(index != book.authors.length-1){
            chicagoCitation += index == book.authors.length-2 ? ', and ' : ', ';
            return true;
          }
          else{
            chicagoCitation += '. ';
            return false;
          } 
          
        }
      })
    }
    chicagoCitation += `${book.releaseYear ? book.releaseYear : 'o. J.'}. `;
    chicagoCitation += `${book.title}${book.subheading ? ': ' + book.subheading+'. ' : '. '}`;
    chicagoCitation += `${book.edition? book.edition+' ed. ':''}`;
    chicagoCitation += `${book.publisher}.`;
    

    return chicagoCitation;
  }
}