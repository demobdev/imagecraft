"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-card-border relative overflow-hidden">
      {/*  Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="relative">
              <img
                src="/image-craft-icon-tp.jpg"
                alt="ImageCraft AI"
                className="h-8 w-8 rounded-md"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary !bg-clip-text text-transparent">
              ImageCraft AI
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your photos with AI-powered editing tools. Remove
            backgrounds, enhance quality, and create stunning visuals in
            seconds.
          </p>

          {/* Made with love */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>for creators everywhere</span>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-card-border text-center">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 ImageCraft AI. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
