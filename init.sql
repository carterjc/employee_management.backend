SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- Schema emp_management
CREATE SCHEMA IF NOT EXISTS `emp_management` DEFAULT CHARACTER SET utf8 ;
USE `emp_management` ;

-- Table `emp_management`.`departments`
DROP TABLE IF EXISTS `emp_management`.`departments` ;

CREATE TABLE IF NOT EXISTS `emp_management`.`departments` (
  `dep_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`dep_id`))
ENGINE = InnoDB;


-- Table `emp_management`.`locations`
DROP TABLE IF EXISTS `emp_management`.`locations` ;

CREATE TABLE IF NOT EXISTS `emp_management`.`locations` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NULL,
  `country` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emp_management`.`positions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_management`.`positions` ;

CREATE TABLE IF NOT EXISTS `emp_management`.`positions` (
  `position_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`position_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emp_management`.`employees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_management`.`employees` ;

CREATE TABLE IF NOT EXISTS `emp_management`.`employees` (
  `emp_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `full_time` INT NOT NULL DEFAULT 0,
  `date_joined` DATE NULL,
  `privilege` INT NOT NULL DEFAULT 0,
  `dep_id` INT NOT NULL,
  `location_id` INT NOT NULL,
  `position_id` INT NOT NULL,
  PRIMARY KEY (`emp_id`),
  UNIQUE INDEX `emp_id_UNIQUE` (`emp_id` ASC) VISIBLE,
  INDEX `fk_employees_departments_idx` (`dep_id` ASC) VISIBLE,
  INDEX `fk_employees_locations1_idx` (`location_id` ASC) VISIBLE,
  INDEX `fk_employees_positions1_idx` (`position_id` ASC) VISIBLE,
  CONSTRAINT `fk_employees_departments`
    FOREIGN KEY (`dep_id`)
    REFERENCES `emp_management`.`departments` (`dep_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employees_locations1`
    FOREIGN KEY (`location_id`)
    REFERENCES `emp_management`.`locations` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employees_positions1`
    FOREIGN KEY (`position_id`)
    REFERENCES `emp_management`.`positions` (`position_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emp_management`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_management`.`customers` ;

CREATE TABLE IF NOT EXISTS `emp_management`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NULL,
  `country` VARCHAR(45) NOT NULL,
  `company_name` VARCHAR(75) NULL,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emp_management`.`sales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_management`.`sales` ;

CREATE TABLE IF NOT EXISTS `emp_management`.`sales` (
  `sale_id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(9,2) NOT NULL,
  `installments` INT NULL,
  `init_date` DATE NOT NULL,
  `date_due` DATE NOT NULL,
  `emp_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  PRIMARY KEY (`sale_id`),
  INDEX `fk_sales_employees1_idx` (`emp_id` ASC) VISIBLE,
  INDEX `fk_sales_customers1_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_sales_employees1`
    FOREIGN KEY (`emp_id`)
    REFERENCES `emp_management`.`employees` (`emp_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_customers1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `emp_management`.`customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO departments VALUES
(DEFAULT, "Cybersecurity", "The company's main defense against the pestiliences of the world"),
(DEFAULT, "Human Resources", "Stay far away"),
(DEFAULT, "Sales", "Keeps the company afloat one phone call at a time"),
(DEFAULT, "Management", "Imagine doing actual work"),
(DEFAULT, "System Administrators", "The true heroes");

INSERT INTO locations VALUES
(DEFAULT, "HQ-0", "250 Bergen Turnpike", "Little Ferry", "NJ", "US");

INSERT INTO positions VALUES
(DEFAULT, "CISO", "Chief Information Security Officer"),
(DEFAULT, "Software Engineer", "Creates the company, or part of it"),
(DEFAULT, "Upper Management", "The fate rests in their hands");

INSERT INTO employees VALUES
(DEFAULT, "Carter", "Costic", "cartercostic@gmail.com", "password", 1, CURDATE(), 2, 1, 1, 1),
(DEFAULT, "Alex", "Costic", "alexcostic@gmail.com", "password123", 1, CURDATE(), 1, 1, 1, 3);

INSERT INTO customers VALUES
(DEFAULT, "Jim", "Kyrsty", "2 Fairview Ave", "Andover", "NY", "US", "Compu-Ed");
