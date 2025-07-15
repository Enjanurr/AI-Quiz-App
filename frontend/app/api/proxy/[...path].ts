import httpProxy from 'http-httpProxy';
import {cookies} from 'next/headers';
import url from 'url'
import { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_HOST;
