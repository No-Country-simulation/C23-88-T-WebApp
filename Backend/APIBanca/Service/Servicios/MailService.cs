﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Model.Modelos;
using Model.ViewModel.account;
using Model.ViewModels;
using MySqlX.XDevAPI;
using MySqlX.XDevAPI.Common;
using Servicio.IServices;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Service.Services
{
    public class MailService : IMailService
    {
        private string APIKey = "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";

        public async Task Send_Email_Test(string email, string message)
        {
            var apiKey = APIKey;  
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("ignacioff56@Gmail.com", "AppBanca");
            var subject = "AppBanca Test";
            var to = new EmailAddress(email);
            var plainTextContent = message;  
            var htmlContent = message;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            // Optional: Check the status of the response (e.g., log the status code)
            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                // Log or handle unsuccessful email sending
                throw new Exception($"Failed to send email. Status Code: {response.StatusCode}");
            }
        }

        public async Task Send_Welcome_Email(string email)
        {
            var apiKey = APIKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("ignacioff56@Gmail.com", "AppBanca");
            var subject = "Bienvenido a AppBanca";
            var to = new EmailAddress(email);
            var plainTextContent = "Bienvenido a AppBanca, una aplicacion que no existe";
            var htmlContent = "Bienvenido a AppBanca, una aplicacion que no existe";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            // Optional: Check the status of the response (e.g., log the status code)
            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                // Log or handle unsuccessful email sending
                throw new Exception($"Failed to send email. Status Code: {response.StatusCode}");
            }
        }

        public async Task Send_Reset_Pass_Email(string email, string code)
        {
            var apiKey = APIKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("ignacioff56@Gmail.com", "AppBanca");
            var subject = "Codigo de cambio de contraseña - AppBanca";
            var to = new EmailAddress(email);
            var plainTextContent = "Estimado,\n" +
                "Su código para autorizar el cambio de contraseña es: " + code + ".\n";
            var htmlContent = "Estimado,\n" +
                "Su código para autorizar el cambio de contraseña es: " + code + ".\n";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task Suspicious_Login_Email(string email)
        {
            var apiKey = APIKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("ignacioff56@Gmail.com", "AppBanca");
            var subject = "Ingreso Sospechoso - AppBanca";
            var to = new EmailAddress(email);
            var plainTextContent = "Estimado,\n" +
                "Se ha iniciado sesion en tu cuenta de AppBanca desde un dispositivo nuevo. Si fuiste tu, ignora este mensaje.";
            var htmlContent = "Estimado,\n" +
                "Se ha iniciado sesion en tu cuenta de AppBanca desde un dispositivo nuevo. Si fuiste tu, ignora este mensaje.";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }

}

