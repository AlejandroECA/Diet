let i = 0; 

let path = new Array(); 

path[0] = "https://media.giphy.com/media/LP5JsUUrc9x2vQugGB/giphy.gif"; 
path[1] = "https://media.giphy.com/media/xIxDEzVliMsfK/giphy.gif"; 
path[2] = "https://media.giphy.com/media/IRv9szzwmDvO0/giphy.gif"; 
path[3] = "https://media.giphy.com/media/5BBYkpgeVVuZW/giphy.gif"


function swapImage() { 

    document.slide.src = path[i];
    

    if(i < path.length - 1) i++; 
    else i = 0; 

    setTimeout("swapImage()",5000); 


} 

window.onload=swapImage; 

class Appform {
    constructor() {
        this.form = [];
        this.step = 0;
        this.currentGroup = null;

        this.setListener();
        this.getform();
        document.getElementById('next-button').disabled = true;
        this.refresh();
        this.check()
        
    }



    submit() {
        console.log("SUBMIT")
    }

    currentInput = () => this.form[this.step - 1].input;
    previousInput = () => this.form[this.step - 2].input;

    check = () => this.currentInput().addEventListener('keyup', this.enableDisable);


    enableDisable = () => {
        if(this.valid(this.currentInput())) {
            this.currentInput().classList.remove('invalid');
            this.setListener();
            document.getElementById('next-button').disabled = false;
        }
        else{
            this.currentInput().classList.add('invalid');
            this.removeListener();
            document.getElementById('next-button').disabled = true;
        }
    }

    valid = (input) => {
        const formtype = input.id;
        const value = input.value;
        const empty = (str) => !str.split('').every(_char => _char !== ' ')

        if(!value || empty(value)) return true;

        switch(formtype) {

            case 'nameInput':
                return true; //reg exp ...check
                break
            case 'weightInput':
                return true;
                break
            case 'ageInput':  
                return true;  
                break           
            case 'sexInput':
                return true;
                break
            case 'dietInput':
                return true;
                break
            default:
                return false
        }
    };

    goBack = () => {
        if(this.step > 1){
            this.currentInput().value = '';
            this.step--;
            this.displayStep();
            this.enableDisable();
        }
    }

    refresh = () => {
        this.step++;
        // this.displayStep();
        console.log(this.form.length)
        if(this.step <= this.form.length){
            this.displayStep();
            this.removeListener();
            document.getElementById('next-button').disabled = true;
            this.check();

        }
        else
            this.submit();
        
    }

    displayStep = () => {
        if(this.currentGroup)
            this.currentGroup.style.display = 'none';
        this.currentGroup = this.form.find(_group => _group.step === this.step).element;
        this.currentGroup.style.display = 'block';
        console.log(this.currentGroup)
    }

    getform = () => {
        const groups = Array.from(document.getElementsByClassName('stepForm'));
        console.log(groups);

        groups.forEach(_group => {
            const children = Array.from(_group.children);
            console.log(children);
            this.form.push({
                'step': Number.parseInt(_group.dataset.step),
                'element':_group,
                'input':children.find(_el => _el.nodeName === "INPUT")
            });
        });
        console.log(this.form)

    }

    setListener = () => {
        document.getElementById('next-button').addEventListener('click', this.refresh);
        document.getElementById('backButton').addEventListener('click', this.goBack);
  
    }

    removeListener = () => {
        document.getElementById('next-button').removeEventListener('click', this.refresh);
       
    }

}

new Appform();


