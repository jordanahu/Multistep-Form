
class View{
    constructor(presenter){
        this.presenter = presenter;
        this.rounds = [...document.querySelectorAll(".rounds>span")];
        this.nextBtn = document.querySelector(".next");
        this.prevBtn = document.querySelector(".prev");
        this.submitBtn = document.querySelector("[type=button]");
        this.formClassesList = [".first", ".second", ".third", ".final"];
        this.formList = [...document.querySelectorAll('.inputs>div')];
        this.inputFieldList = [...document.querySelectorAll("input")];
        this.fname = document.getElementById("fname");
        this.listeners();
   
    }

    listeners() {
        let presenter = this.presenter;
        this.nextBtn.addEventListener("click", (e)=>presenter.handleNext(e));

        this.prevBtn.addEventListener("click", (e)=>presenter.handlePrev(e));

        this.submitBtn.addEventListener("click", ()=>presenter.handleSubmit())
    }
    
}

function HandleCounter(){
    this.counter = 0;
    this.next = ()=>{
          this.counter++;
        if(this.counter>3)this.counter=0;
    }
    this.prev = ()=>{
          this.counter--;
        if(this.counter<0)this.counter=3;
    }
    if(!HandleCounter.Instance)HandleCounter.Instance = this;
    return HandleCounter.Instance;
}


class Presenter{

  
    initialize(view){
        this.view = view;
       
    }


    handleNext(event){
        event.preventDefault();
        const {validateForm} = this.helpers(this);
        const {next:increaseCounter, counter} = new HandleCounter();
        
        let currentForm = document.querySelector(this.view.formClassesList[counter]); 
        
        if(!validateForm(currentForm)) return;
        increaseCounter();
        
        this.handleFormView()
      
    
    }

    handleSubmit(){
      
        const {validateForm, counter} = this.helpers(this);
        
        let currentForm = document.querySelector(this.view.formClassesList[counter]);
        
        if(validateForm(currentForm)){
            alert(`Thank you, ${this.view.fname.value} for viewing my code!`)
        }
       
    }

    handleFormView(){
        
        const {counter} = new HandleCounter();

        let currentForm = document.querySelector(this.view.formClassesList[counter]); 
    
        if(counter>0){
            this.view.prevBtn.classList.remove("hide");
        }else{
            this.view.prevBtn.classList.add("hide");
        };

        if(counter==3){
            this.view.submitBtn.classList.remove("hide");
            this.view.nextBtn.classList.add("hide");
        }else{
            this.view.submitBtn.classList.add("hide");
            this.view.nextBtn.classList.remove("hide");
        }
        
        this.view.formList.forEach(form=>form.classList.remove("show"));
        this.view.rounds.forEach(round=>round.classList.remove("active"));
        currentForm.classList.add("show");
        
        this.view.rounds[counter].classList.add("active");
    }

    handlePrev(e){
        e.preventDefault();
        const {prev:decreaseCounter} = new HandleCounter();
        decreaseCounter();
        this.handleFormView();
        this.view.nextBtn.disabled = false;

    }



    helpers(context){

        function validateForm(currentForm){
           
            let inputList = [...currentForm.querySelectorAll("input")];
           
            let valid = true;
            inputList.forEach(input=>{
                if(!input.value){
                    valid = false;
                };
            if(!valid){
                input.classList.add("invalidInput");
                context.view.nextBtn.disabled = true;
                context.view.submitBtn.disabled = true;
                input.addEventListener("input", ()=>{
                    input.classList.remove("invalidInput");
                    context.view.nextBtn.disabled = false;
                    context.view.submitBtn.disabled = false;
                    valid = true;
                    
                });
            }
            });
            
            return valid;

        }


        return {
            validateForm,
        }
       
    }


}



window.addEventListener("DOMContentLoaded", function(){
    let presenter = new Presenter();
    let view = new View(presenter);
    presenter.initialize(view);
}

)





