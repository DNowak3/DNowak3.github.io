let Autocompleter=new Vue({ 
    template: "<div><img class='inputIcon hidden' src='Grafiki/search.svg' :class='{visible :  focused}'/>\
        <input class='inputSearch' ref='bottom' type='text' aria-label='Szukaj' maxlength='2048' v-model='googleSearch' placeholder='Szukaj' @focus='focused = true' @keyup.enter='enterClicked()' @keyup.down='down()' @keyup.up='up()' role='button' /> \
    <div class='cityNames' :class='{visible : googleSearch.length > 0 && focused && filteredCities.length>0}' >\
                                <ul >\
                                    <li  v-for='(city,index) in filteredCities' >\
                                        <div class='listElement' :class='{liFocused:index == inFocus}'>\
                                            <img class='inputIcon' src='Grafiki/search.svg' />\
                                            <a href='#' v-html='boldenize(city)' v-on:click='selected(index)' >\
                                                <b>{{ city }}</b></a>\
                                        </div>\
                                    </li>\
                                </ul>\
                            </div>\
    ",
    props: ['options'],
    data: {
        
        googleSearch: '',
        cities: window.sities,
        filteredCities:"",
        update_filteredCities:true,
        focused: false,
        change: false,
        inFocus: -1,
        searchedInput:''
        
    },
    updated() {
        this.$nextTick(() => {

            if (this.change) {
                this.$refs.top.focus();

            } else {

                this.$refs.bottom.focus();

            }

        });

    },
    watch: {
        // whenever question changes, this function will run
        inFocus: function () {
        this.update_filteredCities=false;
        this.googleSearch=this.filteredCities[this.inFocus].name;
        
        },
        googleSearch: function(){
            this.createFilteredCities(this.update_filteredCities);
            this.update_filteredCities=true;
            console.log(this.filteredCities);

            if(this.inFocus==-1){
                this.searchedInput=this.googleSearch;
                
            }
        }
    },
    methods:{
        boldenize(city){
            let re = new RegExp(this.searchedInput,"gi");
            let bolden="<b>"+city.name.replace(re, match=>{
                    return "<span class='normal'>"+ match+"</span>";
                })+"</b>";
            console.log(bolden);

            return bolden;
        },
        enterClicked() {
            this.update_filteredCities=true;
            this.change= true;
            this.inFocus=-1;
            this.focused = false;
            },
            selected(i){
            this.googleSearch=this.filteredCities[i].name;
            this.enterClicked();
            },
            isActive(){
                if(this.googleSearch.length==0){
                    this.change=false;
                }
                return this.change;

            },
            down(){
            if(this.inFocus<this.filteredCities.length-1){
                this.inFocus+=1; 
            }
            else if(this.inFocus==this.filteredCities.length-1){
                this.inFocus=0; 
            }
            },
            up(){
            if(this.inFocus>0){
                this.inFocus-=1; 
            }
            else if(this.inFocus==0){
                this.inFocus=this.filteredCities.length-1;
            }
            },
            createFilteredCities(yes){
                if(yes){
                let result=this.cities.filter(city => city.name.includes(this.googleSearch));
                if(result.length>10){
                    this.filteredCities= result.slice(1, 11);
                }
                else{
                    this.filteredCities= result;
                }
                this.inFocus=-1;
                }   
            },
            showResults(){
                if(isActive()){
                    body.classList.add("results");
                }
                else{
                    body.classList.remove("results");
                }
            }
            
    }
})
let vm =new Vue({
        el: '#app',
        components: {
    'v-autocompleter': Autocompleter
  },
    });
Vue.set(vm.someObject, 'googleSearch', "")
Vue.set(vm.someObject, 'focused', false)
/*
Nie wiem co zrobic z tym zeby zaczelo dzialac. Wyswietla sie ten komunikat i ani rusz dalej
Property or method "showResults" is not defined on the instance but referenced during render.
Make sure that this property is reactive, either in the data option,
or for class-based components, by initializing the property
*/