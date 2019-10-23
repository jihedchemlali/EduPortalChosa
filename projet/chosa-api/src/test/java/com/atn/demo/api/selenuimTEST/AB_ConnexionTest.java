package com.atn.demo.api.selenuimTEST;


import com.atn.api.empty.springbootdemo.Application;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.net.URL;

import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class AB_ConnexionTest {

    private static final String URL_WEB = "https://chosa.allence-tunisie.com";
    private static WebDriver driver;
    private static final String URL_SELENIUM_HUB = "http://localhost:4444/wd/hub";

    @BeforeClass
    public static void selenuimBrowser() throws Exception {
        DesiredCapabilities caps = DesiredCapabilities.chrome();

//DesiredCapabilities capabilities = DesiredCapabilities.chrome();
//        ChromeOptions options = new ChromeOptions();
//        options.addArguments("test-type");
//        caps.setCapability("chrome.binary", "/opt/bin/entry_point.sh");
//        caps.setCapability(ChromeOptions.CAPABILITY, options);
        /*webDriver = new ChromeDriver(capabilities);
         */
        driver = new RemoteWebDriver(new URL(URL_SELENIUM_HUB), caps);
    }

//    @Before
//    public void chromeBrowser() {
//        System.setProperty("webdriver.chrome.driver", "/home/trabelsi/Téléchargements/chromedriver_linux64/chromedriver");
//        driver = new ChromeDriver();
//        driver.manage().window().maximize();
//
//
//    }

    @AfterClass
    public static void chromeeBrowseer() {
        driver.quit();
    }

//    @AfterClass
//    public static void chromeeBrowser() {
//        driver.quit();
//    }

    public void parentConnexion() {
        driver.get(URL_WEB);
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(By.xpath(".//a[@href ='/login'] ")).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(new By.ById("validationEmail")).sendKeys("trabelsiamin9@gmail.com");
        driver.findElement(new By.ById("validationPassword")).sendKeys("123");
        WebElement submit = driver.findElement((By.xpath(".//button[@type='submit']")));
        Actions builder = new Actions(driver);
        builder.moveToElement(submit).click().build().perform();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
    }

    @Test
    public void AlreadyHaveAcenterAccountTest() {
        driver.get(URL_WEB);
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        By xpath = By.xpath(".//a[@href ='/inscription'] ");
        WebElement dr = driver.findElement(xpath);
        dr.click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(By.xpath(".//a[@href ='/login'] ")).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(new By.ById("validationEmail")).sendKeys("amin.trabelsi@allence-tunisie.com");
        driver.findElement(new By.ById("validationPassword")).sendKeys("123");
        WebElement submit = driver.findElement((By.xpath(".//button[@type='submit']")));
        Actions builder = new Actions(driver);
        builder.moveToElement(submit).click().build().perform();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
    }

    @Test
    public void centerConnexionTest() {
        driver.get(URL_WEB);
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(By.xpath(".//a[@href ='/login'] ")).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(new By.ById("validationEmail")).sendKeys("amin.trabelsi@allence-tunisie.com");
        driver.findElement(new By.ById("validationPassword")).sendKeys("123");
        WebElement submit = driver.findElement((By.xpath(".//button[@type='submit']")));
        Actions builder = new Actions(driver);
        builder.moveToElement(submit).click().build().perform();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        String url = driver.getCurrentUrl();
        assertTrue("connexiondoesnt work", url.endsWith("ecole/accueil"));

    }

    @Test
    public void ParentConnexionTest() throws InterruptedException {
        driver.get(URL_WEB);
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(By.xpath(".//a[@href ='/login'] ")).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(new By.ById("validationEmail")).sendKeys("trabelsiamin9@gmail.com");
        driver.findElement(new By.ById("validationPassword")).sendKeys("123");
        WebElement submit = driver.findElement((By.xpath(".//button[@type='submit']")));
        Actions builder = new Actions(driver);
        builder.moveToElement(submit).click().build().perform();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        String url = driver.getCurrentUrl();
        assertTrue("cononnection doesnt work", url.endsWith("parent/accueil"));

    }


    @Test
    public void forgotPasswordTest() {
        driver.get(URL_WEB);
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(By.xpath(".//a[@href ='/login'] ")).click();
        Actions builder = new Actions(driver);

        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        driver.findElement(By.xpath(".//a[@href ='/forget-password']")).click();
        driver.findElement(new By.ById("email")).sendKeys("amin.trabelsi@allence-tunisie.com");
        WebElement submitt = driver.findElement((By.xpath(".//button[@type='submit']")));

        builder.moveToElement(submitt).click().build().perform();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        WebElement password = null;
    }


    @Test
    public void DeconnexionTest() throws InterruptedException {
        parentConnexion();
        WebDriverWait wait = new WebDriverWait(driver, 10);


        WebElement el = driver.findElement(By.xpath(".//i[@class ='fas fa-angle-down'] "));
        Actions builder = new Actions(driver);
        builder.moveToElement(el).click().perform();

        WebElement el1 = driver.findElement((By.xpath(".//button[@type='submit']")));
        builder.moveToElement(el1).click().perform();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(new By.ById("loading-bar-spinner")));
        String url = driver.getCurrentUrl();
        assertTrue("deononnection doesnt work", url.endsWith("login"));
    }

}