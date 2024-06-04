
class ChefElfe extends Elfe {
    constructor() {
        super();
        this.setType("Chef Elfe");
        this.setCout(this.getCout() * 2);
        this.setForce(this.getForce() * this.getDegat());
    }
}


