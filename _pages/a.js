// setting 
const GOx_setting={
    glucose_consumption : 1,
    ATP_production : 3,
    production_rate : 60
};

const  glucose_transferase_setting={
    ATP_consumption : 1,
    glucose_production : 1,
    production_rate : 60
}

const GOx_RNA_setting ={
    ATP_consumption : 3000,
    GOx_production:1,
    production_rate : 60/300
};

const glucose_transferase_RNA_setting = {
    ATP_consumption : 2000,
    glucose_transferase_production:1,
    production_rate : 60/200
};

const GOx_gene_setting = {
    ATP_consumption : 3000,
    GOx_RNA_production:1,
    production_rate : 60/200/10
};
const glucose_transferase_gene_setting ={
    ATP_consumption : 2000,
    glucose_transferase_RNA_production:1,
    production_rate : 60/200/10
};

const ATP_num_MAX = 10000000;
const glucose_num_MAX = 5000000;

// declare objects
let ATP_num;
let glucose_num;
let GOx_num;
let glucose_transferase_num;
let GOx_RNA_num;
let glucose_transferase_RNA_num;


// initial state
ATP_num = 30000;
glucose_num = 2000;
GOx_num = 100;
glucose_transferase_num = 200;
GOx_RNA_num = 10;
glucose_transferase_RNA_num = 10;

// caculate 
function caculate(delta){
    let snapshot = {
        ATP_num:ATP_num,
        glucose_num:glucose_num,
        GOx_num:GOx_num,
        glucose_transferase_num:glucose_transferase_num,
        GOx_RNA_num:GOx_RNA_num,
        glucose_transferase_RNA_num:glucose_transferase_RNA_num
    };

    // GOx reaction
    ATP_num+=snapshot.GOx_num*GOx_setting.ATP_production*delta*GOx_setting.production_rate;
    glucose_num-=snapshot.GOx_num*GOx_setting.glucose_consumption*delta*GOx_setting.production_rate;

    // glucose_transferase reaction
    ATP_num-=snapshot.glucose_transferase_num*glucose_transferase_setting.ATP_consumption*delta*glucose_transferase_setting.production_rate;
    glucose_num+=snapshot.glucose_transferase_num*glucose_transferase_setting.glucose_production*delta*glucose_transferase_setting.production_rate;

    // GOx_RNA reaction
    ATP_num-=snapshot.GOx_RNA_num*GOx_RNA_setting.ATP_consumption*delta*GOx_RNA_setting.production_rate;
    GOx_num+=snapshot.GOx_RNA_num*GOx_RNA_setting.GOx_production*delta*GOx_RNA_setting.production_rate;

    // glucose_transferase_RNA reaction
    ATP_num-=snapshot.glucose_transferase_RNA_num*glucose_transferase_RNA_setting.ATP_consumption*delta*glucose_transferase_RNA_setting.production_rate;
    glucose_transferase_num+=snapshot.glucose_transferase_RNA_num*glucose_transferase_RNA_setting.glucose_transferase_production*delta*glucose_transferase_RNA_setting.production_rate;

    // GOx gene reaction
    ATP_num -= GOx_gene_setting.ATP_consumption * delta * GOx_gene_setting.production_rate;
    GOx_RNA_num += GOx_gene_setting.GOx_RNA_production * delta * GOx_gene_setting.production_rate;
    
    // glucose_transferase gene reaction
    ATP_num -= glucose_transferase_gene_setting.ATP_consumption * delta * glucose_transferase_gene_setting.production_rate;
    glucose_transferase_RNA_num += glucose_transferase_gene_setting.glucose_transferase_RNA_production * delta * glucose_transferase_gene_setting.production_rate;

}

// update frontend
function update(){
    // update ATP
    document.getElementById("atp_progress_bar").innerHTML = ~~ATP_num;
    document.getElementById("atp_progress_bar").style.width = 100*ATP_num/ATP_num_MAX + "%";
    
    // update glucose
    document.getElementById("glucose_progress_bar").innerHTML = ~~glucose_num;
    document.getElementById("glucose_progress_bar").style.width = 100*glucose_num/glucose_num_MAX + "%";
    // update GOx 
    document.querySelector("#proteins .proteins_number_container>.GOx>.protein_number").innerHTML = ~~GOx_num;
    
    // update glucose_transferase
    document.querySelector("#proteins .proteins_number_container>.glucose_transferase>.protein_number").innerHTML = ~~glucose_transferase_num;

    // update GOx_RNA
    document.querySelector("#RNAs>.GOx>.RNA_number").innerHTML = ~~GOx_RNA_num;
    document.querySelector("#RNAs>.GOx .RNA_progress_bar").style.width = 100*(GOx_num%1)+"%";
    // update glucose_transferase_RNA
    document.querySelector("#RNAs>.glucose_transferase>.RNA_number").innerHTML = ~~glucose_transferase_RNA_num;
    document.querySelector("#RNAs>.glucose_transferase .RNA_progress_bar").style.width = 100*(glucose_transferase_num%1)+"%";

    // update GOx gene
    document.querySelector("#DNA>.GOx .DNA_progress_bar").style.width = 100*(GOx_RNA_num%1)+"%";
    // update glucose_transferase gene
    document.querySelector("#DNA>.glucose_transferase .DNA_progress_bar").style.width = 100*(glucose_transferase_RNA_num%1)+"%";

};


let last_time=Date.now();
function run(){
    now = Date.now();
    let time_passed = now - last_time;
    last_time = now;

    caculate(time_passed/1000);
    update();
    setTimeout(run,1000/60);
}




update();
debugger;
setTimeout(run,1000);